import { Api, DiamanoPayAPI, Page, PaymentServiceTypeEnum } from '../dist';
import {
  CardPaymentRequestBody,
  OneStepPaymentRequestBodyDto,
  PaymentTokenBody,
  CreatePayoutDto,
  CreateBatchPayoutDto,
  QrCodePaymentRequestBody,
} from '../dist/type';

class Example {
  private clientId = 'ci_test_diamano_pay_sn_141d9a95a6094d7e8522dd293e34f396';
  private clientSecret =
    'cs_test_diamano_pay_sn_56b8c933b1f24e658dc741e936509a36';
  private api: Api;
  private page: Page;
  constructor() {
    this.init();
  }
  private async init() {
    // Initialisation
    // const diamanoPayAPI = await DiamanoPayAPI.init(
    //   this.clientSecret,
    //   this.clientId,
    // );
    const diamanoPayAPI = await DiamanoPayAPI.initWithToken(
      '683842b922f713e0686a78c4',
    );
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
      paymentMethods: [
        PaymentServiceTypeEnum.ORANGE_MONEY,
        PaymentServiceTypeEnum.WAVE,
      ],
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

  async makePayout() {
    const body: CreatePayoutDto = {
      amount: 100,
      mobile: '771234567',
      provider: 'WAVE',
      name: 'Test Payout',
      clientReference: 'test-payout-01',
      description: 'Test de paiement unitaire',
    };
    try {
      console.log('Initiating a single payout...');
      const res = await this.api.payout(body);
      console.log('Payout Response:', res);
      return res;
    } catch (error) {
      console.error('Error during payout:', error);
    }
  }

  async createBatchPayout() {
    const body: CreateBatchPayoutDto = {
      description: 'Paiements de test en lot',
      callbackUrl: 'https://mon-service.com/webhook',
      payouts: [
        {
          amount: 100,
          mobile: '771234567',
          provider: 'WAVE',
          name: 'Test Wave',
          clientReference: 'test-wave-01',
        },
        {
          amount: 200,
          mobile: '771234568',
          provider: 'ORANGE_MONEY',
          name: 'Test OM',
          clientReference: 'test-om-01',
        },
      ],
    };
    try {
      const res = await this.api.createBatchPayout(body);
      console.log('Réponse de la création du lot :', res);
      // Nous pouvons utiliser le batchId retourné pour vérifier le statut
      if (res && res.length > 0) {
        // Attendons un peu avant de vérifier le statut pour laisser le temps au traitement de commencer
        setTimeout(() => this.getBatchStatus(res[0].batchId), 15000);
      }
      return res;
    } catch (error) {
      console.error('Erreur lors de la création du lot :', error);
    }
  }

  async getBatchStatus(batchId: string) {
    try {
      console.log(`Vérification du statut pour le lot : ${batchId}`);
      const res = await this.api.getBatchPayoutStatus(batchId);
      console.log('Statut du lot :', res);
      return res;
    } catch (error) {
      console.error(
        `Erreur lors de la récupération du statut du lot ${batchId} :`,
        error,
      );
    }
  }
}

const example = new Example();
setTimeout(() => {
  example.makePayout();
}, 5000);
