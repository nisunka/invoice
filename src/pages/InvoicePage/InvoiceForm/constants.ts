import * as yup from "yup";
import rus from "assets/img/flags/russ.png";

enum EMessges {
  Required = 'Это поле обязательно для заполнения',
  invalidData = 'Укажите дату в формате дд.мм.гггг',
  isValidCountBase = 'Сократите до 210 символов',
  isValidCountName = 'Сократите до 120 символов',
  isValidPriceNumber = 'Сократите номер до 20 символов'
}

export const initialInvoiceValues = {
  choiceAccount: "",
  partnerName: "",
  positions: [{ title: "", count: 0, what: "", price: "", nds: 0, total: 0 }],
  additional: {
    base: "",
    name: "",
    priceNumber: "",
    dataOfCreation: "",
    deadLine: "",
  },
  withApproved: false,
  photo: "",
};

const isValidDate = (val: string) =>
  val?.replaceAll("_", "").length === 10 &&
  new Date(val).toString() !== "Invalid Date";

const isValidCountBase = (value: string) =>
  value?.length < 210

const isValidCountName = (value: string) =>
  value?.length < 120

const isValidPriceNumber = (value: string) =>
value?.length < 20

export const invoiceValidation = yup.object().shape({
  choiceAccount: yup.string().required(EMessges.Required),
  partnerName: yup.string().required(EMessges.Required),
  positions: yup.array().of(
    yup.object().shape({
      count: yup.number(),
      what: yup.string(),
      price: yup.string(),
      nds: yup.string(),
      total: yup.number(),
    })
  ),
  additional: yup.object().shape({
    base: yup
    .string()
    .test("len", EMessges.isValidCountBase, (value) => isValidCountBase(value!))
    .required(),
    name: yup
    .string()
    .test("len", EMessges.isValidCountName, (value) => isValidCountName(value!))
    .required(),
    priceNumber: yup
    .string()
    .test("len", EMessges.isValidPriceNumber, (value) => isValidPriceNumber(value!))
    .required(),
    dataOfCreation: yup
      .string()
      .test("len", EMessges.invalidData, (val) => isValidDate(val!))
      .required(EMessges.Required),
    deadLine: yup
      .string()
      .test("len", EMessges.invalidData, (val) => isValidDate(val!))
      .required(EMessges.Required),
  }),
  withApproved: yup.boolean(),
  photo: yup.mixed(),
});

export const accountItems = [
  {
    value: "50 275,37 ₽ - Расчетный",
    icon: rus,
  },
  {
    value: "34 275,37 ₽ - Расчетный",
    icon: rus,
  },
  {
    value: "10 275,37 ₽ - Расчетный",
    icon: rus,
  },
];
