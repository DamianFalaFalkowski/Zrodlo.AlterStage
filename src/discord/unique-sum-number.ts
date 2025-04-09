export class GID
{
    readonly geometricIndex: number;
    readonly byteRepresentatnion: Array<boolean>;

    constructor(geometricIndex: number)
    {
        this.geometricIndex = geometricIndex
        this.byteRepresentatnion = this.toBytes(geometricIndex);
    }

    

    private toBytes(geometricIndex: number): boolean[]
    {
        if(geometricIndex < 0)
            throw Error();
        switch(geometricIndex)
        {
            case 0:
                return [false];
            case 1:
                return [true];
            default:
                if(geometricIndex < 1)
                    throw Error();
                else{
                    let arr: boolean[] = new Array<boolean>(Math.abs(geometricIndex));
                    arr[0] = true;
                    return arr;
                }
        }
    }
}


//Geometric = Number = Array
// 0g = 0 = [0]
// 1g = 1 = [1]
// 2g = 2 = [10]
// 3g = 4 = [100]
// 4g = 8
// 5g = 16