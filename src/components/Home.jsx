import React from 'react'
import { Box, Stack } from '@chakra-ui/react'
import Card from './Card'
import axios from 'axios'


const Home = () => {

    const checkoutHandler = async (amount) => {

        const { data: { key } } = await axios.get("https://razorpay-backend-edqe.onrender.com/api/getkey")

        const { data: { order } } = await axios.post("https://razorpay-backend-edqe.onrender.com/api/checkout",
            {
                amount
            })

        const options = {
            key: key, // Enter the Key ID generated from the Dashboard
            amount: order.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            currency: "INR",
            name: "Kunnu Sharma",
            description: "Razorpay Integration Transaction",
            image: "https://media.licdn.com/dms/image/D4D35AQGZdtHiidAHxQ/profile-framedphoto-shrink_400_400/0/1697340925868?e=1705600800&v=beta&t=d5AU_ik-5bGzISTvB4cMrq9YAxisvU5HUprAwZ8hYmI",
            order_id: order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            callback_url: "http://localhost:4000/api/paymentverification",
            prefill: {
                "name": "Gaurav Kumar", //logged in user card name and details
                "email": "gaurav.kumar@example.com",
                "contact": "9000090000"
            },
            notes: {
                "address": "Razorpay Corporate Office"
            },
            theme: {
                "color": "#2964C2"
            }
        };

        const razor = new window.Razorpay(options);
            razor.open();
           

    }

    return (
        <Box>
            <Stack h={'100vh'} justifyContent={'center'} alignItems={'center'} direction={['column', 'row']}>
                <Card amount={5000} img={"https://th.bing.com/th/id/OIP.uj21rdWJCNqZDaOXrlqAZwHaGX?w=197&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7"} checkoutHandler={checkoutHandler} />
                <Card amount={3000} img={"https://th.bing.com/th/id/OIP.bFYZPfVl67voHgBlS2NHIwHaHa?w=175&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7"} checkoutHandler={checkoutHandler} />
            </Stack>
        </Box>
    )
}

export default Home
