import {Utils} from 'utils/Utils.js';

class ComplexArray2D{
    constructor(cpuArrs = null, gpuArrs = null){
        this.cpuArrs = cpuArrs;
        this.gpuArrs = gpuArrs;
    }
    get dims(){
        return (this.cpuArrs == null) ?
            this.gpuArrs[0].dims :
            this.cpuArrs[0].dims;
    }
    getCPUArrs(manager){
        if(this.cpuArrs == null){
            if(manager.useFloat){
                const arr2D = manager.gpuArrToArr(this.gpuArrs[0], false);
                this.cpuArrs = [Utils.compute2DArrayAsArray2D(
                    arr2D.dims,
                    pos => arr2D.data[pos.y][pos.x][3]
                ), Utils.compute2DArrayAsArray2D(
                    arr2D.dims,
                    pos => arr2D.data[pos.y][pos.x][0]
                )];
            }
            else{
                this.cpuArrs = [
                    manager.gpuArrToArr(this.gpuArrs[0]),
                    (this.gpuArrs[1] == null) ? null :
                    manager.gpuArrToArr(this.gpuArrs[1])
                ];
            }
        }
        return this.cpuArrs;
    }
    getGPUArrs(manager){
        if(this.gpuArrs == null){
            if(manager.useFloat){
                if(this.cpuArrs[1] == null){
                    this.gpuArrs = [manager.flatArrToGPUArr(
                        Utils.flatten(this.cpuArrs[0].data),
                        this.dims, 1
                    )];
                }
                else{
                    this.gpuArrs = [manager.arrToGPUArr(
                        Utils.compute2DArrayAsArray2D(
                            this.dims,
                            pos => [
                                this.cpuArrs[1].data[pos.y][pos.x],
                                0, 0,
                                this.cpuArrs[0].data[pos.y][pos.x]
                            ]
                        ), false
                    )];
                }
            }
            else{
                this.gpuArrs = [
                    manager.arrToGPUArr(this.cpuArrs[0]),
                    (this.cpuArrs[1] == null) ? null :
                    manager.arrToGPUArr(this.cpuArrs[1])
                ];
            }
        }
        return this.gpuArrs;
    }
    getGPUArr(manager){
        return this.getGPUArrs(manager)[0];
    }
    dispose(manager){
        if(this.gpuArrs != null){
            this.gpuArrs.map(gpuArr => {
                if(gpuArr != null) manager.disposeGPUArr(gpuArr);
            });
        }
    }
    static fromRealArr(arr){
        return new ComplexArray2D([arr, null]);
    }
    static fromArrs(realArr, imgArr){
        return new ComplexArray2D([realArr, imgArr]);
    }
    static fromGPUArr(gpuArr){
        return new ComplexArray2D(null, [gpuArr]);
    }
    static fromGPUArrs(realGPUArr, imgGPUArr){
        return new ComplexArray2D(null, [realGPUArr, imgGPUArr]);
    }
}

module.exports = ComplexArray2D;
