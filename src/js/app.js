export class Base extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });
  }
}

//  - - COM ELEMENTS - -

export class COMBase extends Base {
  constructor() {
    super();
  }
}

export class COMNetwork extends COMBase {
  constructor() {
    super();
  }
}

export class COMChain extends COMBase {
  constructor() {
    super();
  }
}

export class COMModule extends COMBase {
  constructor() {
    super();
  }
}

export class COMParameter extends COMBase {
  constructor() {
    super();
  }
}

export class COMOut extends COMBase {
  constructor() {
    super();
  }
}

export class COMPeriphial extends COMBase {
  constructor() {
    super();
  }
}

customElements.define("com-network", COMNetwork);
customElements.define("com-chain", COMChain);
customElements.define("com-module", COMModule);
customElements.define("com-parameter", COMParameter);
customElements.define("com-out", COMOut);
customElements.define("com-periphial", COMPeriphial);

//  - - LAYOUT ELEMENTS - -

export class LayoutBase extends Base {
  constructor() {
    super();
  }
}

export class XFlex extends LayoutBase {
  constructor() {
    super();

    this.shadowRoot;
  }
}

customElements.define("x-flex", XFlex);
