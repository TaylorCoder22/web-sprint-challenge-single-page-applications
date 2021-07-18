import React from 'react'
import { Link } from 'react-router-dom'
import Styled from 'styled-components'

const Home = () => {
    const img = Styled.div`
    max-width: 50%,
    max-height: 50px
    `

    return (
        <div className='home-container'>
            <h1>Lambda Eats!</h1>
            <div className='navigation'>
                <Link to='/'>Home</Link>
                <br></br>
                <Link to='/Pizza'>Form</Link>
            </div>
            <img className='home-image' src='https://townsquare.media/site/63/files/2020/02/heart-shaped-pizza.jpg?w=1200&h=0&zc=1&s=0&a=t&q=89' max-width='25%' alt='pizza' />
            <br></br>
            <div className='home-body'>
                <h2>Get To Know Us!</h2>
                <p>We are a small town pizza shop here to satisfy all your pizza needs. We have been establised since July 16, 2021. We serve the best pizza around. Made fresh daily and made to your liking. All that's left is to come on in and GET A SLICE!</p>
            </div>
        </div>
    )
}

export default Home;