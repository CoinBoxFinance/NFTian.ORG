import Header from "./Header"

const Comingsoon = () => {
    return(
        <>
        <Header />

        <section class="coming-soon-section padding-tb">
        <div class="container">
            <div class="coming-wrapper text-center">
                <div class="inner-logo mb-5">
                    <a href="index.html">
                        <img src={require('../images/logo/cbfinft-logo.png').default} alt="" />
                        {/* <img src="assets/images/logo/logo.png" alt="aNFT Logo"> */}
                    </a>
                </div>
                <ul class="lab-ul count-down d-flex flex-wrap event-count justify-content-center mb-4"
                    data-date="July 31, 2022 21:14:01">
                    <li class="rounded-circle">
                        <span class="days">34</span>
                        <div class="count-text">Days</div>
                    </li>
                    <li class="rounded-circle">
                        <span class="hours">09</span>
                        <div class="count-text">Hours</div>
                    </li>
                    <li class="rounded-circle">
                        <span class="minutes">32</span>
                        <div class="count-text">Muni</div>
                    </li>
                    <li class="rounded-circle">
                        <span class="seconds">32</span>
                        <div class="count-text">Seco</div>
                    </li>
                </ul>
                <h1 class="coming-soon-title mb-4">Coming Soon</h1>
            </div>
        </div>
    </section>
        </>
    )
}

export default Comingsoon;