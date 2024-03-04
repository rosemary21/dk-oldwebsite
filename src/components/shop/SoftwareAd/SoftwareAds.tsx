

export default function SoftwareAd() {
  return (
    <section>
      <div className="software-ad-container">
        <div className="software-ad-content-left">
          <div className="software-ad-header">
            We teach devs how to write better content.
          </div>
          <div className="software-ad-body">
            Proin faucibus nibh et sagittis a. Lacinia purus ac amet
            pellentesque aliquam enim.
          </div>
          <span className="software-ad-footer">
            Lorem ipsum dolor sit amet, consectetur adipis elit. Sit enim nec,
            proin faucibus nibh et sagittis a. Lacinia purus ac amet
            pellentesque aliquam enim.
          </span>
        </div>

        <div className="software-ad-content-right">
          <div className="about-card-container">
            <div className="about-card-up">
              <img src="/images/photograph-content.png" alt="about-card-img" />
            </div>
            <div className="about-card-down">
              <h1>How to write content about your photographs</h1>
              <span>August 15, 2021</span>
            </div>
          </div>
          <div className="about-card-container">
            <div className="about-card-up">
              <img src="/images/website-content.png" alt="about-card-img" />
            </div>
            <div className="about-card-down">
              <h1>How to choose the right colors when creating a website?</h1>
              <span>March 21, 2021</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
