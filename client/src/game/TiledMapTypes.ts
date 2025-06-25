// Basic Tiled types
export interface TiledLayerData {
    data: number[];
    name: string;
    width: number;
    height: number;
    type: string;
    visible: boolean;
}

export interface TiledTilesetRef {
    firstgid: number;
    source: string;
}

export interface TiledMap {
    width: number;
    height: number;
    tilewidth: number;
    tileheight: number;
    layers: Array<TiledLayerData>;
    tilesets: Array<TiledTilesetRef>;
} 