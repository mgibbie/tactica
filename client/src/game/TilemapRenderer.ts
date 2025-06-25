import * as THREE from 'three';
import { TiledMap } from './TiledMapTypes';

export function createFullTilemapMesh(mapData: TiledMap, texture: THREE.Texture, scale: number): THREE.Mesh | null {
    console.log('Creating full tilemap mesh...');

    const TILESET_COLUMNS = Math.floor(texture.image.width / mapData.tilewidth);
    console.log('Tileset columns for full map:', TILESET_COLUMNS);

    const allVertices: number[] = [];
    const allUVs: number[] = [];
    const allIndices: number[] = [];
    const allNormals: number[] = [];
    let vertexIndexOffset = 0;
    const GID_EMPTY = 0;

    mapData.layers.forEach(layer => {
        if (layer.type === 'tilelayer' && layer.visible && layer.data) {
            for (let y = 0; y < layer.height; y++) {
                for (let x = 0; x < layer.width; x++) {
                    const gid = layer.data[y * layer.width + x];
                    if (gid === GID_EMPTY) continue;

                    const firstGid = mapData.tilesets[0].firstgid;
                    const tileIndex = gid - firstGid;
                    if (tileIndex < 0) continue;

                    const tsx = tileIndex % TILESET_COLUMNS;
                    const tsy = Math.floor(tileIndex / TILESET_COLUMNS);

                    const u0 = (tsx * mapData.tilewidth) / texture.image.width;
                    const u1 = ((tsx + 1) * mapData.tilewidth) / texture.image.width;
                    const v0 = (tsy * mapData.tileheight) / texture.image.height;
                    const v1 = ((tsy + 1) * mapData.tileheight) / texture.image.height;

                    const worldTileX = x * mapData.tilewidth * scale;
                    const worldTileY = -y * mapData.tileheight * scale;

                    allVertices.push(worldTileX, worldTileY, 0);
                    allUVs.push(u0, v0);
                    allNormals.push(0, 0, 1);
                    allVertices.push(worldTileX, worldTileY - mapData.tileheight * scale, 0);
                    allUVs.push(u0, v1);
                    allNormals.push(0, 0, 1);
                    allVertices.push(worldTileX + mapData.tilewidth * scale, worldTileY, 0);
                    allUVs.push(u1, v0);
                    allNormals.push(0, 0, 1);
                    allVertices.push(worldTileX + mapData.tilewidth * scale, worldTileY - mapData.tileheight * scale, 0);
                    allUVs.push(u1, v1);
                    allNormals.push(0, 0, 1);

                    allIndices.push(vertexIndexOffset + 0, vertexIndexOffset + 1, vertexIndexOffset + 2);
                    allIndices.push(vertexIndexOffset + 2, vertexIndexOffset + 1, vertexIndexOffset + 3);
                    vertexIndexOffset += 4;
                }
            }
        }
    });

    if (allVertices.length === 0) {
        console.log('No vertices to render for the full map.');
        return null;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(allVertices, 3));
    geometry.setAttribute('uv', new THREE.Float32BufferAttribute(allUVs, 2));
    geometry.setAttribute('normal', new THREE.Float32BufferAttribute(allNormals, 3));
    geometry.setIndex(allIndices);

    const material = new THREE.MeshBasicMaterial({
        map: texture,
        color: 0xffffff,
        side: THREE.FrontSide
    });

    const tilemapMesh = new THREE.Mesh(geometry, material);
    console.log('Full tilemap mesh created.');
    return tilemapMesh;
} 