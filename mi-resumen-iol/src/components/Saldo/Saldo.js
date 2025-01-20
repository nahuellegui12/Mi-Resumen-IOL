import React from 'react'
import './Saldo.css'

const Saldo = ({ estado }) => {
    console.log(estado)
    const saldoPesos = Math.round(estado.cuentas[0].total)
    const saldoDolares = Math.round(estado.cuentas[1].total)
    return (
        <div className="contenedor-saldos">
            <div className="contenedor-saldo">
                <img className='bandera-saldo' src='https://upload.wikimedia.org/wikipedia/commons/1/19/Bandera_Argentina_%28Alternativa%29.png' alt='bandera argentina'/>
                <p className='valor-saldo'>${saldoPesos}</p>
                {/* <pre style={{ textAlign: "left" }}>
                    {JSON.stringify(estado, null, 2)}
                </pre> */}
            </div>
            <div className="contenedor-saldo">
                <img className='bandera-saldo' src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Flag_of_the_United_States.svg/255px-Flag_of_the_United_States.svg.png' alt='bandera estadounidense'/>
                <p className='valor-saldo'>${saldoDolares}</p>
                {/* <pre style={{ textAlign: "left" }}>
                    {JSON.stringify(estado, null, 2)}
                </pre> */}
            </div>
        </div>
    )
}

export default Saldo
