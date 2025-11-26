import { useInfo } from '../hooks/useInfo.js'
import '../styles/HeaderApp.css'
import { UserIcon, ChecksIcon, CoinIcon } from "./Icons.jsx"
import { PercentageChart } from './PercentageChart.jsx';
import { TableUsers } from './TableUsers.jsx';

function CardHeader({ icon, title, quantity }) {
    return (
        <li>
            <div className="icon-card">
                {icon}
            </div>
            <div className="content-card-text">
                <span>{title}</span>
                <span className='quantity'>{quantity}</span>
            </div>
        </li>
    )
}

export function HeaderApp() { 
    const { allInfo } = useInfo()
    if (allInfo === null || allInfo.ok === false) return null

    const { 
        total_personas, 
        personas_paz_y_salvo, 
        personas_sin_pagar,
        total_recaudar,
        total_recaudado
    } = allInfo.data[0]

    const porcentajeRecaudado = total_recaudar > 0
        ? Math.round((total_recaudado / total_recaudar) * 100)
        : 0

    const CARDS = [
        {
            icon: <UserIcon />,
            title: 'Total Personas',
            quantity: total_personas
        },
        {
            icon: <ChecksIcon />,
            title: 'Personas paz y salvo',
            quantity: personas_paz_y_salvo
        },
        {
            icon: <CoinIcon />,
            title: 'Personas sin pagar',
            quantity: personas_sin_pagar
        }
    ]

    return (
        <header className="header-app">
            <ul>
                {CARDS.map(card => (
                    <CardHeader
                        key={card.title}
                        {...card}
                     />
                ))}
            </ul>
            <section className='info-money'>
                <div className='total-money-info'>
                    <h2 className='total-recaudar'>TOTAL A RECAUDAR: ${total_recaudar}</h2>
                    <h2 className='total-recaudado'>TOTAL RECAUDADO: ${total_recaudado}</h2>
                </div>
                <PercentageChart percentage={porcentajeRecaudado}/>
            </section>
        </header>
    )
}