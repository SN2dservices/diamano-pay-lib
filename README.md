# Diamano pay lib

Cette librairie a pour objectif de simplifier l'accès à la plateforme de paiement Diamano pay.

## Que contient cette librairie ?

- La partie API

  - Demande de paiement orange money OneStep.
  - Demande de paiement orange money avec QR CODE.
  - Demande de paiement wave avec QR CODE.
  - Récupération d'un token de paiement avec Stripe pour les cartes bancaires.
  - Remboursement d'une transaction.
  - Calcul des frais de transaction.
  - Exécution de paiements en lot (batch payout) et suivi de leur statut.
  - Exécution d'un paiement sortant (payout).

- La partie Page de paiement diamano pay
  - Permet d'obtenir un lien de paiement de diamano pay.

## Installation

```bash
  npm i @2dservices/diamano-pay-lib
```

## Exemple d'utilisation

```javascript
import { DiamanoPayAPI } from '@2dservices/diamano-pay-lib';
import { Api } from '@2dservices/diamano-pay-lib/api';
import { Page } from '@2dservices/diamano-pay-lib/page';
import {
  CardPaymentRequestBody,
  OneStepPaymentRequestBodyDto,
  PaymentTokenBody,
  CreateBatchPayoutDto,
  CreatePayoutDto,
  QrCodePaymentRequestBody,
} from '@2dservices/diamano-pay-lib/type';

class Example {
  private clientId = process.env.CLIENT_ID;
  private clientSecret = process.env.CLIENT_SECRET;
  private token = process.env.TOKEN;
  private api: Api;
  private page: Page;
  constructor() {
    this.init();
  }
  private async init() {
    // Initialisation
    const diamanoPayAPI = await DiamanoPayAPI.init(
      this.clientSecret,
      this.clientId
    );
    // Oubien avec un token
    const diamanoPayAPIWithToken = await DiamanoPayAPI.initWithToken(this.token);
    // Création d'un instance Api
    this.api = diamanoPayAPI.newApi();
    // Création d'un instance Page
    this.page = diamanoPayAPI.newPage();
  }

  async payByOrangeMoneyOneStep() {
    const body: OneStepPaymentRequestBodyDto = {
      amount: 1000,
      customerId: '7761234567',
      description: "Achat d'un chargeur",
      otp: '123456', // généré en composant #144#391*Code# ou en sandbox en utilisant l'application mobile de diamanopay pour faire des tests
    };
    const res = await this.api.payByOrangeMoneyOneStep(body);
    console.log(res);
    return res;
  }
  async payByOrangeMoneyQrCode() {
    const body: QrCodePaymentRequestBody = {
      amount: 1000,
      description: "Achat d'un chargeur",
      callbackCancelUrl: 'https://www.maboutique.sn?cancel=true', // url de retour après annulation du client
      callbackSuccessUrl: 'https://www.maboutique.sn?success=ok', // url de retour après paiement
      extraData: { idClient: '123456' }, // data qui sera retourné durant l'appel du webhook, ce champ est optionel
      webhook: 'https://www.maboutique.sn/callback', // url vers la quelle diamano pay va notifier le status de la transaction, ce champ est optionel, s'il n'est pas renseigné, c'est l'url configurée dans l'application qui sera utilisée
    };
    const res = await this.api.payByOrangeMoneyQrCode(body);
    console.log(res);
    return res;
  }
  async payByWaveQrCode() {
    const body: QrCodePaymentRequestBody = {
      amount: 1000,
      description: "Achat d'un chargeur",
      callbackCancelUrl: 'https://www.maboutique.sn?cancel=true', // url de retour après annulation du client
      callbackSuccessUrl: 'https://www.maboutique.sn?success=ok', // url de retour après paiement
      extraData: { idClient: '123456' }, // data qui sera retourné durant l'appel du webhook, ce champ est optionel
      webhook: 'https://www.maboutique.sn/callback', // url vers la quelle diamano pay va notifier le status de la transaction, ce champ est optionel, s'il n'est pas renseigné, c'est l'url configurée dans l'application qui sera utilisée
    };
    const res = await this.api.payByWaveQrCode(body);
    console.log(res);
    return res;
  }
  async getStripeClientSecret() {
    const body: CardPaymentRequestBody = {
      amount: 1000,
      description: "Achat d'un chargeur",
      callbackCancelUrl: 'https://www.maboutique.sn?cancel=true', // url de retour après annulation du client
      callbackSuccessUrl: 'https://www.maboutique.sn?success=ok', // url de retour après paiement
      extraData: { idClient: '123456' }, // data qui sera retourné durant l'appel du webhook, ce champ est optionel
      webhook: 'https://www.maboutique.sn/callback', // url vers la quelle diamano pay va notifier le status de la transaction, ce champ est optionel, s'il n'est pas renseigné, c'est l'url configurée dans l'application qui sera utilisée
    };
    const res = await this.api.getStripeClientSecret(body);
    console.log(res);
    return res;
  }

  async getPaymentPage() {
    const body: PaymentTokenBody = {
      amount: 1000,
      description: "Achat d'un chargeur",
      callbackCancelUrl: 'https://www.maboutique.sn?cancel=true', // url de retour après annulation du client
      callbackSuccessUrl: 'https://www.maboutique.sn?success=ok', // url de retour après paiement
      extraData: { idClient: '123456' }, // data qui sera retourné durant l'appel du webhook, ce champ est optionel
      webhook: 'https://www.maboutique.sn/callback', // url vers la quelle diamano pay va notifier le status de la transaction, ce champ est optionel, s'il n'est pas renseigné, c'est l'url configurée dans l'application qui sera utilisée
    };
    const res = await this.page.getPaymentToken(body);
    console.log(res);
    return res;
  }

  async refundTransaction() {
    const transactionId = 'ID_DE_LA_TRANSACTION_A_REMBOURSER'; // Remplacez par un ID de transaction réel
    const res = await this.api.refund(transactionId);
    console.log(res); // Devrait être true si le remboursement a réussi
    return res;
  }

  async calculateTransactionFees() {
    // Cas 1: Frais à la charge du marchand
    const paramsMerchantFees = { amount: 10000 };
    const resMerchantFees = await this.api.calculateFees(paramsMerchantFees);
    console.log('Frais à la charge du marchand:', resMerchantFees);
    // {
    //   baseAmount: 10000,
    //   platformFee: 200, (exemple)
    //   amountToChargeCustomer: 10000,
    //   netAmountReceivedByMerchant: 9800 (exemple)
    // }

    // Cas 2: Frais à la charge du client
    const paramsCustomerFees = { amount: 10000, feeOnCustomer: true };
    const resCustomerFees = await this.api.calculateFees(paramsCustomerFees);
    console.log('Frais à la charge du client:', resCustomerFees);
    // {
    //   baseAmount: 10000,
    //   platformFee: 200, (exemple)
    //   amountToChargeCustomer: 10200, (exemple)
    //   netAmountReceivedByMerchant: 10000
    // }
    return { resMerchantFees, resCustomerFees };
  }

  async makePayout() {
    const body: CreatePayoutDto = {
      amount: 10000,
      mobile: "771234567",
      provider: "WAVE",
      name: "Fatou Diop",
      description: "Paiement facture #INV-003",
      clientReference: "payout-xyz-001"
    };
    const res = await this.api.payout(body);
    console.log(res); // Devrait retourner un objet avec success, message, transactionId, etc.
    return res;
  }
  async createBatchPayout() {
    const body: CreateBatchPayoutDto = {
      description: "Paiements salaires Mai 2024",
      callbackUrl: "https://votresite.com/webhook/payout-status",
      payouts: [
        {
          amount: 50000,
          mobile: "771112233",
          provider: "WAVE",
          name: "Fatou Diop",
          clientReference: "SAL-FDIOP-MAI24"
        },
        {
          amount: 75000,
          mobile: "784445566",
          provider: "ORANGE_MONEY",
          name: "Abdoulaye Dia", // Le nom est optionnel pour Orange Money mais recommandé
          clientReference: "SAL-ADIA-MAI24"
        }
      ]
    };
    const res = await this.api.createBatchPayout(body);
    console.log(res); // Devrait retourner un tableau avec les informations des lots créés (dont batchId)
    return res;
  }

  async getBatchStatus() {
    const batchId = 'ID_DU_LOT_RECU_PRECEDEMMENT'; // Remplacez par un ID de lot réel
    const res = await this.api.getBatchPayoutStatus(batchId);
    console.log(res); // Devrait retourner le statut détaillé du lot
    return res;
  }
}
```
