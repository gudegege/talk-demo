import { Link } from "react-router-dom";

export function ActiveUser({ active_user }) {
  return (
    <article className="box">
      <div className="columns">
        <div className="column is-3">
          <figure className="image is-128x128">
            <img
              className="is_rounded"
              src={active_user.image || `/images/monster0${active_user.id}.png`}
              alt={active_user.name}
            />
          </figure>
        </div>
        <div className="column">
          <h3 className="title is-5">
            <Link
              className="has-text-dark"
              to={`/active_users/${active_user.id}`}
            >
              名前: {active_user.nickname}<br />
              <span className={`tag is-${active_user.status > 0 ? "danger" : "light" }`}>
                状態: {active_user.status > 0 ? "ON" : "OFF"} 
              </span>
            </Link>
          </h3>
        </div>
      </div>
    </article>
  );
}
