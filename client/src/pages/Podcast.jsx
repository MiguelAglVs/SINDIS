// import React from 'react';
import Navigation from "../components/Navbar";
import Footer from "../components/Footer";

const Podcast = () => {
  return (
    <>
      <Navigation />
      <section className="knowledge">
        <div className="container container-landing mt-5">
            <div className="row">
              <div className="col-sm-12 mb-3 mb-sm-4">
                <div className="card">
                  <div className="card-body">
                    <iframe
                      width="100%"
                      height="450"
                      allow="autoplay"
                      src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/1225428679&color=%235c5c58&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"
                    ></iframe>
                  </div>
                </div>
              </div>
              {/* <div className="col-sm-6 mb-sm-4">
              <div className="card">
                <div className="card-body">
                  <iframe
                    width="100%"
                    height="166"
                    allow="autoplay"
                    src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/913344394&color=%235c5c58&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"
                  ></iframe>
                </div>
              </div>
            </div> */}
            </div>
          </div>
      </section>
      <Footer />
    </>
  );
};

export default Podcast;
