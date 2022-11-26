import PLam from "./PLam";
import PType from "../../../../src/onchain/pluts/PType";

export type PFn<Inputs extends [ PType, ...PType[] ], Output extends PType > = 
    Inputs extends [ infer PInstance extends PType ] ?
        PLam< PInstance, Output > :
    Inputs extends [ infer PInstance extends PType, ...infer PInstances extends [ PType, ...PType[] ] ] ?
        PLam< PInstance, PFn< PInstances, Output> >:
        never

export default PFn;