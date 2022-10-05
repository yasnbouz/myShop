function Hero() {
  return (
    <div className="relative mx-auto">
      <section className="px-4 flex flex-col min-h-[500px] md:min-h-[800px] items-center justify-center backdrop-filter backdrop-blur-96px backdrop-brightness-105 backdrop-contrast-105">
        <h1 className="font-extrabold text-black text-center bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-transparent text-4xl sm:text-6xl md:text-7xl">
          Jamstack E-commerce
        </h1>
        <p className="font-bold text-dark-400 text-center text-xl mt-4 sm:text-3xl md:text-4xl">Shopify Storefront with Nextjs</p>
      </section>
      <div className="top-0 left-0 w-250px absolute -z-1 sm:(w-400px)" aria-hidden>
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path
            fill="#FF0066"
            d="M45.4,-48.9C57.6,-33.2,65.4,-16.6,66.7,1.3C68,19.2,62.9,38.5,50.7,50.8C38.5,63.2,19.2,68.7,1.8,66.8C-15.5,65,-31.1,55.8,-43.4,43.4C-55.8,31.1,-65,15.5,-67.6,-2.6C-70.3,-20.8,-66.4,-41.6,-54,-57.3C-41.6,-73,-20.8,-83.5,-2.1,-81.4C16.6,-79.3,33.2,-64.5,45.4,-48.9Z"
            transform="translate(100 100)"
          />
        </svg>
      </div>
      <div className="w-250px absolute bottom-0 right-0 -z-1 sm:(w-400px)" aria-hidden>
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path
            fill="#8A3FFC"
            d="M46.2,-47.7C59.7,-32.8,70.2,-16.4,72,1.8C73.8,20,66.9,40.1,53.5,51.2C40.1,62.4,20,64.8,2.5,62.3C-15.1,59.9,-30.2,52.6,-44.9,41.4C-59.6,30.2,-73.9,15.1,-74.5,-0.6C-75.1,-16.3,-62.1,-32.7,-47.4,-47.6C-32.7,-62.4,-16.3,-75.9,0,-75.9C16.4,-75.9,32.8,-62.6,46.2,-47.7Z"
            transform="translate(100 100)"
          />
        </svg>
      </div>
    </div>
  );
}

export default Hero;
// background-color: #21D4FD;
// background-image: linear-gradient(225deg, #21D4FD 0%, #B721FF 100%);
