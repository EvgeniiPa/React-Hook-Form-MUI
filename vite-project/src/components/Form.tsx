import { Input, Button} from '@mui/material'
import { useForm, Controller, useFieldArray} from 'react-hook-form'
import { DateCalendar } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

export default function Form(){
    const {formState:{errors},handleSubmit, control, reset} = useForm({
        defaultValues:{
          MyNumber: '',
        },
        mode: 'onBlur',
      })
    
    const {fields, append, remove } = useFieldArray({
        control,
        name: 'MyNumberNew',
    })
    
    function sendForm(data){
        console.log(data)
        reset()
    }
    

    return(
    <LocalizationProvider dateAdapter={AdapterDayjs}>
              
       <form onSubmit={handleSubmit(sendForm)} style={{margin:'0px auto', width:'500px', marginTop:'15px', display:'flex', flexDirection:'column', gap: '10px'}}>
        <Controller
            name='MyNumber'
            control={control}
            rules={{minLength: 5, maxLength: 7, required:true,}}
            render={({field})=> <Input {...field} placeholder='Your number...'/>}
        />
        {errors.MyNumber ? <span>Введите от 5 до 7 символов</span> : 
        <>
        <Controller
            name='MyDate'
            control={control}
            rules={{
                required:true,
                min: '2024-04-10',
            }}
            render={({field})=><DateCalendar {...field} disablePast={true}/>}
            />
        {errors.MyDate && <span>Дата введена неверно</span>}
        {fields.map((field, index)=>(
            <div style={{display:'flex'}} key={field.id}>
                <Controller
                name={`MyNumberNew.${field.id}`}
                control={control}
                rules={{minLength: 5, maxLength: 7, required:true,}}
                render={({field})=> <Input {...field} type='number'/>}
                />
                <Button onClick={()=> remove(index)}>DELETE</Button>
            </div>
            ))}
        </>
      }
      <div style={{display:'flex', justifyContent:'space-between'}}>
        <Button type='submit'>Send Form</Button>
        <Button type='button' onClick={()=> append({})}>Create Input</Button>
      </div>
    </form> 

    </LocalizationProvider>
    )
}