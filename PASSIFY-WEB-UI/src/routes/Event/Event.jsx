import "./Event.scss";

function Event() {
  return (
    <div className="event-page">
      <div className="event-container">

        <h1>Host Your Event</h1>

        <div className="description">
          <p>Looking to share your passion with the world?</p>
          <p>
            Join our community of organizers and start selling tickets with ease.
            We provide all the tools you need to make your event a success.
          </p>
        </div>

        <a
          href={"https://passify-net.azurewebsites.net/"}
          className="cta-button"
          target="_blank"
          rel="noopener noreferrer"
        >
          Get Started as an Organizer
        </a>

        <p className="footer-note">
          Already have an account? <span>Contact support</span> to upgrade to
          admin access.
        </p>
      </div>
    </div>
  );
}

export default Event;