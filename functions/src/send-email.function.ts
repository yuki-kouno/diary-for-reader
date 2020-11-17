import * as functions from 'firebase-functions';
import * as sgMail from '@sendgrid/mail';

const API_KEY = functions.config().sendgrid.key1;

sgMail.setApiKey(API_KEY);

export const sendEmail = (data: {
  to: string;
  templateId: string;
  dynamicTemplateData?: {};
}) => {
  return sgMail.send({
    from: {
      email: 'zgoovw@gmail.com',
      name: '読書家のための日記帳',
    },
    ...data,
  });
};
