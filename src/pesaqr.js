import { LitElement, html, css } from "lit";
import qrcode from "qrcode-generator";

const TRANSACTION_TYPE = {
  TILL_NUMBER: "till",
  PAYBILL: "paybill",
  SEND_MONEY: "phone",
};

export class PesaQR extends LitElement {
  static properties = {
    type: { type: String }, // till, paybill, or phone
    tillNumber: { type: String },
    paybillNumber: { type: String },
    accountNumber: { type: String },
    phoneNumber: { type: String },
    amount: { type: String },
    width: { type: Number },
  };

  static styles = css`
    :host {
      display: block;
      font-family: Arial, sans-serif;
      --qr-size: calc(var(--qr-width, 600px) * 0.35);
      --header-padding: calc(var(--qr-size) * 0.025);
      --border-radius: calc(var(--qr-size) * 0.05);
      --font-size: calc(var(--qr-size) * 0.05);
    }

    .pesaqr {
      position: relative;
      border: calc(var(--qr-size) * 0.02) solid #16A34A;
      border-radius: var(--border-radius);
      overflow: visible;
      width: fit-content;
      background: white;
      margin-top: calc(var(--header-padding) * 2);
    }

    .qr-header {
      position: absolute;
      top: 0;
      left: 50%;
      transform: translate(-50%, -50%);
      background: #16A34A;
      color: white;
      padding: var(--header-padding) calc(var(--header-padding) * 2);
      text-align: center;
      user-select: none;
      font-weight: bold;
      border-radius: calc(var(--border-radius) * 0.35);
      font-size: var(--font-size);
      white-space: nowrap;
      border: calc(var(--qr-size) * 0.02) solid #16A34A;
    }

    #qrcode {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    #qrcode img {
      width: var(--qr-size) !important;
      height: var(--qr-size) !important;
      border-radius: calc(var(--border-radius) * 0.75);
    }
  `;

  constructor() {
    super();
    this.type = "";
    this.tillNumber = "";
    this.paybillNumber = "";
    this.accountNumber = "";
    this.phoneNumber = "";
    this.amount = "";
    this.width = null;
  }

  render() {
    return html`
      <div class="pesaqr">
        <div class="qr-header">SCAN WITH M-PESA</div>
        <div id="qrcode"></div>
      </div>
    `;
  }

  updated(changedProperties) {
    if (
      changedProperties.has("type") ||
      changedProperties.has("tillNumber") ||
      changedProperties.has("paybillNumber") ||
      changedProperties.has("accountNumber") ||
      changedProperties.has("phoneNumber") ||
      changedProperties.has("amount") 
    ) {
      this.generateQRCode();
    }
    if (changedProperties.has("width")) {
      if (this.width) {
        this.style.setProperty("--qr-width", `${this.width}px`);
      }
    }
  }

  generateQRCode() {
    let qrData = "";

    switch (this.type) {
      case TRANSACTION_TYPE.TILL_NUMBER:
        if (this.tillNumber) {
          qrData = `BG|${this.tillNumber}|${this.amount}`;
        }
        break;
      case TRANSACTION_TYPE.PAYBILL:
        if (this.paybillNumber && this.accountNumber) {
          qrData = `PB|${this.paybillNumber}|${this.amount}|${this.accountNumber}`;
        }
        break;
      case TRANSACTION_TYPE.SEND_MONEY:
        if (this.phoneNumber) {
          qrData = `SM|${this.phoneNumber}|${this.amount}`;
        }
        break;
      default:
        console.error("Invalid transaction type");
        return;
    }

    if (qrData) {
      const qr = qrcode(0, "L");
      qr.addData(qrData);
      qr.make();

      const qrCodeContainer = this.shadowRoot.getElementById("qrcode");
      qrCodeContainer.innerHTML = qr.createImgTag(20);
    }
  }
}

customElements.define("pesa-qr", PesaQR);
