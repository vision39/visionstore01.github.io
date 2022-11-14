import React, { useState, useEffect } from "react";
import "../Styles/home.css";
import { Link } from "react-router-dom";
import { motion } from "framer-motion"
import products from '../assets/data/products'

import Helmet from '../components/Helmet/Helmet';

import { Container, Row, Col } from 'reactstrap';
import heroImg from '../assets/images/hero-img.png';

import Services from '../services/Services';
import ProductsList from '../components/UI/ProductsList';
import Clock from "../components/UI/Clock";
import counterImg from '../assets/images/counter-timer-img.png'


const Home = () => {

  const [trendingProducts, setTrendingProducts] = useState([]);
  const [bestSalesProducts, setBestSalesProducts] = useState([]);
  const [mobileProducts, setMobileProducts] = useState([])
  const [wirelessProducts, setWirelessProducts] = useState([])
  const [popularProducts, setPopularProducts] = useState([])


  const year = new Date().getFullYear()

  useEffect(() => {
    const filteredTrendingProducts = products.filter(item => item.category === 'chair');
    const filteredBestSalesProducts = products.filter(item => item.category === 'sofa');
    const filteredMobileProducts = products.filter(item => item.category === 'mobile');
    const filteredWirelessProducts = products.filter(item => item.category === 'wireless');
    const filteredPopularProducts = products.filter(item => item.category === 'watch');

    setTrendingProducts(filteredTrendingProducts);
    setBestSalesProducts(filteredBestSalesProducts);
    setMobileProducts(filteredMobileProducts);
    setWirelessProducts(filteredWirelessProducts);
    setPopularProducts(filteredPopularProducts);
  }, [])

  return <Helmet title={'Home'}>
    <section className="hero_section">
      <Container>
        <Row>
          <Col lg='6' md='6'>
            <div className="hero_content">
              <p className="hero_subtitle">Trending product in {year}</p>
              <h2>Make Your Internal More Minimalistic & Modern</h2>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto quas maxime quos cupiditate blanditiis, repellat quaerat explicabo voluptate culpa aliquam?</p>

              <motion.button whileTap={{ scale: 1.2 }} className="buy_btn"><Link to='/shop'>SHOP NOW</Link></motion.button>
            </div>
          </Col>

          <Col lg='6' ms='6'>
            <div className="hero_img">
              <img src={heroImg} alt="" />
            </div>
          </Col>

        </Row>
      </Container>
    </section>

    <Services />
    <section className="trending_product">
      <Container>
        <Row>
          <Col lg='12' className='text-center'>
            <h2 className='section.title'>Trending Products</h2>
          </Col>
          <ProductsList data={trendingProducts} />
        </Row>
      </Container>
    </section>

    <section className="best_sales">
      <Container>
        <Row>
          <Col lg='12' className='text-center'>
            <h2 className='section.title'>Best Sales</h2>
          </Col>

          <ProductsList data={bestSalesProducts} />
        </Row>
      </Container>
    </section>

    <section className="timer_count">
      <Container>
        <Row>
          <Col lg='6' md='12' className="count_down-col">

            <div className="clock_top-content">
              <h4 className="text-white fs-6 mb-2">Limited Offer</h4>
              <h3 className="text-white fs-5 mb-3">Quality Arm Chair</h3>
            </div>
            <Clock />

            <motion.button whileTap={{ scale: 1.2 }} className="buy_btn store_btn"><Link to="/shop">Visit Store</Link></motion.button>
          </Col>

          <Col lg='6' md='12' className="text-end counter_img">
            <img src={counterImg} alt="" />
          </Col>
        </Row>
      </Container>
    </section>

    <section className="new_arrivals">
      <Container>
        <Row>
          <Col lg='12' className='text-center mb-5'>
            <h2 className='section.title'>New Arrived</h2>
          </Col>
          <ProductsList data={mobileProducts}/>
          <ProductsList data={wirelessProducts}/>
        </Row>
      </Container>
    </section>

    <section className="popular_category">
    <Container>
        <Row>
          <Col lg='12' className='text-center mb-5'>
            <h2 className='section.title'>Popular in Category</h2>
          </Col>
          <ProductsList data={popularProducts}/>
        </Row>
      </Container>
    </section>
  </Helmet>
}

export default Home