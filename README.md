# Diamano pay lib

Cette librairie a pour objectif de simplifier l'accès à la plateforme de paiement Diamano pay.

## Que contient cette librairie ?

- La partie API

  - Demande de paiement orange money OneStep.
  - Demande de paiement orange money avec QR CODE.
  - Demande de paiement wave avec QR CODE.
  - Récupération d'un token de paiement avec Stripe pour les cartes bancaires.

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
}
```
