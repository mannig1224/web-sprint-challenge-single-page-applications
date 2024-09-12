import React from 'react'


export default function Form(props) {
    const {
        values,
        submit,
        change,
        disabled,
        errors,
    } = props

    const onSubmit = evt => {
        evt.preventDefault()
        submit()
    }

    const onChange = evt => {
        /* 🔥 FIX THIS SO IT ALSO WORKS WITH CHECKBOXES */
        const { name, value, type, checked } = evt.target;
        const valueToUse = type === 'checkbox' ? checked : value;
        change(name, valueToUse);
        }

    return (
       <form id='pizza-form' onSubmit={onSubmit}>
            <div className='form-group submit'>
                <h2>Your Pizza is Waiting!</h2>

                <button disabled={disabled} className='submitBtn' id='order-button'>Add to Order</button>

                <div className='errors'>
                    <div>{errors.name}</div>
                    <div>{errors.special}</div>
                    <div>{errors.size}</div>
                </div>
    

            </div>
        
            <div className='form-group inputs'>
            
            {/* ////////// TEXT INPUTS ////////// */}
            <label>Name&nbsp;
            <input
                id='name-input'
                value={values.name}
                onChange={onChange}
                name='name'
                type='text'
            />
            </label>

            <label>Size
                <select
                    id='size-dropdown'
                    onChange={onChange}
                    value={values.role}
                    name='size'
                >
                    <option value =''>- Size -</option>
                    <option value ='small'>Small</option>
                    <option value ='medium'>Medium</option>
                    <option value ='large'>Large</option>

                </select>
            </label>

            <label>Special Instuctions
            <input
                id='special-text'
                value={values.special}
                onChange={onChange}
                name='special'
                type='text'
            />
            </label>

        </div>

        <div className='form-group checkboxes'>
            <h4>Toppings</h4>
            {/* ////////// CHECKBOXES ////////// */}
            <label>Ham
                <input 
                    type='checkbox'
                    name='ham'
                    checked={values.ham}
                    onChange={onChange}                    
                />
            </label>
            <label>Sausage
                <input 
                    type='checkbox'
                    name='sausage'
                    checked={values.sausage}
                    onChange={onChange}                    
                />
            </label>
            <label>Pepperoni
                <input 
                    type='checkbox'
                    name='pepperoni'
                    checked={values.pepperoni}
                    onChange={onChange}                    
                />
            </label>
            <label>Pineapple
                <input 
                    type='checkbox'
                    name='pineapple'
                    checked={values.pineapple}
                    onChange={onChange}                    
                />
            </label>
                            
        </div>

       </form>

    )
}
