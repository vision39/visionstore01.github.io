import React from 'react'
import { motion } from 'framer-motion'
import '../../Styles/product-card.css'
import { Col } from "reactstrap"
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify';

import { useDispatch } from 'react-redux'
import { cartActions } from '../../redux/slices/cartSlice'

const ProductCard = ({ item }) => {

    const dispatch = useDispatch()

    const addToCart = () => {
        dispatch(cartActions.addItem({
            id: item.id,
            productName: item.productName,
            price: item.price,
            imgUrl: item.imgUrl
        })
        );

        toast.success('Product added successfully.');

    }

    return (
        <Col lg='3' mg='4' className='mb-2'>
            <div className="product_item">
                <div className="product img">
                    <motion.img whileHover={{ scale: 0.9 }} src={item.imgUrl} alt="" />
                </div>
                <div className='p-2 product_info'>
                    <h3 className="product_name"><Link to={`/shop/${item.id}`}>{item.productName}</Link></h3>
                    <span>{item.category}</span>
                </div>

                <div className="product_card-bottom d-flex align-item-center justify-content-between p-2">
                    <span className="price">${item.price}</span>
                    <motion.span whileTap={{ scale: 1.1 }} onClick={addToCart}><i class="ri-add-line"></i></motion.span>
                </div>
            </div>
        </Col>
    )
}

export default ProductCard