import * as yup from 'yup';

export const authValidationSchema = yup.object().shape({
    login: yup.string().required(),
    password: yup.string().required(),
});

export const catalogValidationSchema = yup.object().shape({
    catalog_name: yup.object().shape({
        ru: yup.string(),
        uk: yup.string().required(),
        en: yup.string().required(),
    })
});

export const categoryValidationSchema = yup.object().shape({
    category_name: yup.object().shape({
        ru: yup.string(),
        uk: yup.string().required(),
        en: yup.string().required(),
    })
});

export const productValidationSchema = yup.object().shape({
    name: yup.object().shape({
        ru: yup.string(),
        uk: yup.string().required(),
        en: yup.string().required(),
    }),
    description: yup.object().shape({
        ru: yup.string(),
        uk: yup.string(),
        en: yup.string(),
    }),
    image: yup.string().required(),
    price: yup.string().required(),
    discount_price: yup.string(),
    bulk_price: yup.array().of(yup.object().shape({
        id: yup.string().required(),
        from: yup.string().required(),
        price: yup.string().required(),
    })),
    published_date: yup.string(),
    modified_date: yup.string(),
    new: yup.boolean(),
});