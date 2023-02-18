//src/components/NFTCard.js
import React from 'react';

// import { makeStyles } from "@material-ui/core/styles";
// core components
// import Card from "/components/Card/Card.js";
// import CardBody from "/components/Card/CardBody.js";

//component that takes an nft object and maps it to corresponding elements
const NFTCard = ({nft}) => {
    return (
        // make a card component
        // <Card>
        //     <CardBody>
        <div className='max-w-lg rounded overflow-hidden shadow-lg'>
            {console.log(nft)}
            {/* <img src={nft.tokenUri.gateway} alt="" className='w-full' /> */}
            <div className='px-4 py-4'>
                <div className='font-bold text-teal-600 text-xl mb-2'>{nft.name}</div>
                <ul>
                    <li>Owner:<strong>{nft.title}</strong></li>
                </ul>
            </div>
            {/* <div className='px-6 py-4'>
                {nft.traits?.map((trait, index) => (
                <span key={index} className="inline-block bg-gray-200
                 rounded-full px-3 py-2 text-sm font-semibold text-gray-700 mr-2">{trait['trait_type']}:{trait.value}
                </span>))}
                <div>
                </div>
            </div> */}
        </div>
        // </CardBody>
        // </Card>
    )
}

export default NFTCard;