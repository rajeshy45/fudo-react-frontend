import React from 'react';
import TopFoodRow from './menusection-components/TopFoodRow';

function MenuSection() {

    const [items, setItems] = React.useState([]);


    React.useEffect(() => {
        const request = async () => {
            const response = await fetch('/items');
            const json = await response.json();
            setItems(json.items);
            console.log(json);
        };
        request();
    }, []);


    const topFudos = items.filter(item => item.category.includes("Top Fudos"));

    const topCategories = [
        {
            name: "Non Veg",
            img: "/images/Biryani.jpg"
        },
        {
            name: "Fast Foods",
            img: "/images/chicken-noodles.jpg"
        },
        {
            name: "Deserts",
            img: "/images/choco-cake.jpg"
        },
        {
            name: "Veg",
            img: "/images/veg-biryani-recipe-735x490.jpg"
        }
    ];

    const topOffers = items.filter(item => item.category.includes("Top Offers"));


    return (
        <section id='menu'>
            <div className='container-fluid'>
                <h3>WHAT WE SERVE</h3>
            </div>
            <TopFoodRow title="Top Fudos" items={topFudos} action="/item/" />
            <TopFoodRow title="Top Categories" items={topCategories} action="/menu/c/" />
            <TopFoodRow title="Top Offers" items={topOffers} action="/item/" />
        </section>
    );
}

export default MenuSection;