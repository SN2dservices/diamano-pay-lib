import {
  DiamanoPayAPI,
  Api,
  Page,
  CardPaymentRequestBody,
  OneStepPaymentRequestBodyDto,
  PaymentTokenBody,
  QrCodePaymentRequestBody,
} from '../dist';

class Example {
  private clientId = 'ci_test_diamano_pay_sn_141d9a95a6094d7e8522dd293e34f396';
  private clientSecret =
    'cs_test_diamano_pay_sn_56b8c933b1f24e658dc741e936509a36';
  private api: Api;
  private page: Page;
  private prod = false;
  constructor() {
    this.init();
  }
  private async init() {
    // Initialisation
    const diamanoPayAPI = await DiamanoPayAPI.init(
      this.clientSecret,
      this.clientId,
      this.prod,
    );
    // const diamanoPayAPI = await DiamanoPayAPI.initWithToken(
    //   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjNkNmRjOWQ1LTRhODQtNDFhOS05YzI2LTExYTljMDY0Mzc0OCIsInNjb3BlIjpbImFwaS5vcmFuZ2VfbW9uZXkub25lX3N0ZXAiXSwiaWF0IjoxNzA0Mjk0OTUwLCJleHAiOjE3NjQ3MTYzOTl9.6u1-a36Z87l5-7WMqcfSTs3SPDSVVcgjVQOjQB1SMKM',
    //   this.prod,
    // );
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

const example = new Example();
setTimeout(() => {
  example.payByOrangeMoneyQrCode();
}, 5000);
