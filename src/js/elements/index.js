export class Base extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({ mode: "open" });

        /**@type {HTMLTemplateElement} */
        const basetemplate = document.getElementById("Base");

        this.shadowRoot.appendChild(basetemplate.content.cloneNode(true));

        /**@type {HTMLTemplateElement} */
        const template = document.getElementById(this.constructor.name);

        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }
}

//  - - COM ELEMENTS - -

/**@typedef {"connected" | "disconneced" | "change"} LifeCycleTypes */

/**
 * @typedef {Object} LifeCycleDetail
 * @property {LifeCycleTypes} type
 * @property {COMNetwork | COMChain | COMModule | COMOut | COMParameter} emitter
 * @property {COMChain} chain
 * @property {COMModule} [module]
 * @property {COMOut} [out]
 */

export class COMBase extends Base {
    constructor() {
        super();

        /**@type {HTMLTemplateElement} */
        const template = document.getElementById("COMBase");

        this.shadowRoot.prepend(template.content.cloneNode(true));

        this._init = false;

        this.addEventListener("com:bus:lifecycle", (e) => {
            if (e.target == this) return;
            if (this instanceof COMChain) e.detail.chain = this;
            if (this instanceof COMModule) e.detail.module = this;
            if (this instanceof COMOut) e.detail.out = this;
        });
    }

    connectedCallback() {
        this.emittLifeCycle("connected");
    }

    remove() {
        if (!this.parentElement) return this;
        const element = this.parentElement.removeChild(this);
        this.emittLifeCycle("disconneced");
        return element;
    }

    /**@param {LifeCycleTypes} type */
    emittLifeCycle(type) {
        this.dispatchEvent(
            new CustomEvent("com:bus:lifecycle", {
                bubbles: true,
                detail: {
                    type,
                    emitter: this,
                },
            })
        );
    }
}

export class COMNetwork extends COMBase {
    constructor() {
        super();

        this.addEventListener("com:bus:lifecycle", (e) => {
            console.log(e.detail);
        });
    }
}

export class COMChain extends COMBase {
    constructor() {
        super();
    }
}

const MODULE_TYPES = {
    PTH: [],
    LFO: [
        { name: "AMP", value: 0.5 },
        { name: "FREQ", value: 0.125 },
    ],
    PROB: [{ name: "CHNS", value: 0.5 }],
};

/**@typedef {keyof typeof MODULE_TYPES} ModuleTypes */

export class COMModule extends COMBase {
    constructor() {
        super();
    }

    connectedCallback() {
        super.connectedCallback();

        if (!this._init) {
            /**@type {ModuleTypes} */
            const type = this.getAttribute("type") ?? "PTH";
            this.shadowRoot.getElementById("type").textContent = `${type}`;

            if (type != "PTH") {
                const parameters = MODULE_TYPES[type];

                const ps = parameters?.map((p) => {
                    const param = document.createElement("com-parameter");
                    param.name = p.name;
                    param.value = p.value;
                    return param;
                });

                this.shadowRoot.getElementById("parameters").append(...ps);
            }

            this._init = true;
        }
    }
}

export class COMParameter extends COMBase {
    constructor() {
        super();

        /**@type {HTMLInputElement} */
        this.parameter = this.shadowRoot.getElementById("parameter");
    }

    /**@param {string} value */
    set name(value) {
        this.shadowRoot.getElementById("name").textContent = value;
        this.parameter.setAttribute("name", value);
    }

    /**@param {number} value */
    set value(value) {
        this.parameter.value = value.toString();
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

        /**@type {HTMLTemplateElement} */
        const template = document.getElementById("LayoutBase");

        this.shadowRoot.prepend(template.content.cloneNode(true));
    }
}

export class XFlex extends LayoutBase {
    constructor() {
        super();
    }
}

customElements.define("x-flex", XFlex);
