import * as React from "react";

import "./KeyPage.css";
import repeatIcon from "./assets/Dashboard-Icons/Repeat.svg";
import infoIcon from "./assets/Dashboard-Icons/Info.svg";

const SAVE_OPTIONS = [
  {
    label: "I have copied and saved my key",
    value: "USER"
  },
  {
    label: "I want to save my key online",
    value: "ONLINE"
  }
];

class KeyPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      token: null,
      saveOptionSelected: null
    };

    this.handleSaveOptionClick = this.handleSaveOptionClick.bind(this);
    this.handleContinueClick = this.handleContinueClick.bind(this);
    this.handleRepeatClick = this.handleRepeatClick.bind(this);
    this.saveMnemonicToDatabase = this.saveMnemonicToDatabase.bind(this);
  }

  componentDidMount() {
    // TODO: Move componentDidMount logic from App.js here
  }

  handleRepeatClick() {
    console.log("get new token");
  }

  handleSaveOptionClick(saveOptionSelected) {
    this.setState({ saveOptionSelected });
  }

  handleContinueClick() {
    const { saveOptionSelected } = this.state;

    // Redirect user without saving mnemoic
    if (saveOptionSelected === "USER") {
      // TODO: Redirect
      return;
    }

    this.saveMnemonicToDatabase()
      .then(() => {
        // TODO: Redirect
      })
      .catch(() => console.error("Error saving key"));
  }

  saveMnemonicToDatabase() {
    const { user } = this.props;

    return fetch(`/api/auth/mnemonic`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("xToken")}`,
        "content-type": "application/json; charset=utf-8"
      },
      body: JSON.stringify({
        id: user.id,
        mnemonic: sessionStorage.getItem("xMnemonic")
      })
    });
  }

  render() {
    const { saveOptionSelected } = this.state;
    return (
      <div className="key">
        <div className="key-inner">
          <h2 className="key-title">
            Your encryption key is below. Please save your key!
          </h2>
          <h3 className="key-subtitle">
            You will need your key for the first time you log into your X Cloud
            with a new device. Choose one of the options below.
          </h3>

          <div className="mnemoic-container">
            <div className="mnemoic-value">
              Cat Dog Horse Yacht Snow Rain Sun Wind Shoes Money Moose Card
            </div>
            <div onClick={this.handleRepeatClick} className="button-repeat">
              <img src={repeatIcon} alt="Repeat" className="icon-repeat" />
            </div>
          </div>

          <div className="save-key-options">
            {SAVE_OPTIONS.map((option, index) => {
              const selected =
                saveOptionSelected === option.value ? "selected" : "";
              return (
                <div
                  key={index}
                  onClick={() => this.handleSaveOptionClick(option.value)}
                  className={`button-save-key ${selected}`}
                >
                  <span className="label">{option.label}</span>
                  <img src={infoIcon} alt="Info" className="icon-info" />
                </div>
              );
            })}
          </div>

          <div onClick={this.handleContinueClick} className="button-continue">
            Continue
          </div>
        </div>
      </div>
    );
  }
}

export default KeyPage;