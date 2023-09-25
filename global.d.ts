import {
    COMChain,
    COMModule,
    COMNetwork,
    COMOut,
    COMParameter,
    COMPeriphial,
    LifeCycleDetail,
} from "./src/js/elements/index";

declare global {
    interface HTMLElementTagNameMap {
        "com-network": COMNetwork;
        "com-chain": COMChain;
        "com-module": COMModule;
        "com-parameter": COMParameter;
        "com-out": COMOut;
        "com-periphial": COMPeriphial;
    }
    interface HTMLElementEventMap {
        "com:bus:lifecycle": CustomEvent<LifeCycleDetail>;
    }
}
