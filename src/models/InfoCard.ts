export class InfoCard{
    constructor(
        readonly name: string,
        readonly type: string,
        readonly unit: string,
        readonly value: number,
        readonly planValue: number,
        readonly prevValue: number,
        ){}
}
