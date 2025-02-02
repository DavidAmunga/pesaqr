import { LitElement, html, css, PropertyValues } from "lit";
import { customElement, property } from "lit/decorators.js";
import qrcode from "qrcode-generator";

const TRANSACTION_TYPE = {
  TILL_NUMBER: "till",
  PAYBILL: "paybill",
  SEND_MONEY: "phone",
} as const;

type TransactionType = (typeof TRANSACTION_TYPE)[keyof typeof TRANSACTION_TYPE];

export interface PesaQRProps {
  /** Type of payment: till, paybill, or phone */
  type: "till" | "paybill" | "phone";
  /** Till number for till payments */
  tillNumber?: string;
  /** Paybill number for paybill payments */
  paybillNumber?: string;
  /** Account number for paybill payments */
  accountNumber?: string;
  /** Phone number for send money payments */
  phoneNumber?: string;
  /** Payment amount */
  amount: string;
  /** QR code width in pixels */
  width?: number;
}

@customElement("pesa-qr")
export class PesaQR extends LitElement {
  @property({ type: String }) type: TransactionType = "till";
  @property({ type: String }) tillNumber = "";
  @property({ type: String }) paybillNumber = "";
  @property({ type: String }) accountNumber = "";
  @property({ type: String }) phoneNumber = "";
  @property({ type: String }) amount = "";
  @property({ type: Number }) width: number | null = null;
  @property({ type: String }) theme: "light" | "dark" = "light";
  @property({ type: Boolean }) loading = false;
  @property({ type: String }) error: string | null = null;

  static styles = css`
    :host {
      display: block;
      font-family: Arial, sans-serif;
      --qr-size: calc(var(--qr-width, 600px) * 0.35);
      --header-padding: calc(var(--qr-size) * 0.025);
      --border-radius: calc(var(--qr-size) * 0.05);
      --font-size: calc(var(--qr-size) * 0.05);

      /* Theme Variables */
      --qr-primary-color: var(--pesaqr-primary-color, #16a34a);
      --qr-background: var(--pesaqr-background, white);
      --qr-text-color: var(--pesaqr-text-color, white);
      --qr-border-color: var(--pesaqr-border-color, #16a34a);
    }

    /* Dark theme */
    :host([theme="dark"]) {
      --qr-primary-color: var(--pesaqr-primary-color, #22c55e);
      --qr-background: var(--pesaqr-background, #1f2937);
      --qr-text-color: var(--pesaqr-text-color, #f3f4f6);
      --qr-border-color: var(--pesaqr-border-color, #22c55e);
    }

    .pesaqr {
      position: relative;
      border: calc(var(--qr-size) * 0.02) solid var(--qr-border-color);
      border-radius: var(--border-radius);
      overflow: visible;
      width: fit-content;
      background: var(--qr-background);
      margin-top: calc(var(--header-padding) * 2);
    }

    .qr-header {
      position: absolute;
      top: 0;
      left: 50%;
      transform: translate(-50%, -50%);
      background: var(--qr-primary-color);
      color: var(--qr-text-color);
      padding: var(--header-padding) calc(var(--header-padding) * 2);
      text-align: center;
      user-select: none;
      font-weight: bold;
      border-radius: calc(var(--border-radius) * 0.35);
      font-size: var(--font-size);
      white-space: nowrap;
      border: calc(var(--qr-size) * 0.02) solid var(--qr-border-color);
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
    this.type = "till";
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

  updated(changedProperties: PropertyValues): void {
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

      const qrCodeContainer = this.shadowRoot?.getElementById("qrcode");
      if (qrCodeContainer) {
        qrCodeContainer.innerHTML = qr.createImgTag(20);
      }
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "pesa-qr": PesaQR;
  }
}
