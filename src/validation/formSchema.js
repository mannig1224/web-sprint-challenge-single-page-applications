import * as yup from 'yup'

export default yup.object().shape({
    name: yup.string()
        .required("name is required")
        .min(2, "name must be at least 2 characters"),
    size: yup.string()
        .required("Size is required"),
    special: yup.string(),
    ham: yup.boolean(),
    pepperoni: yup.boolean(),
    pineapple: yup.boolean(),
    sausage: yup.boolean()

})