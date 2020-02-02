import React, {useCallback, useState} from 'react';
import Modal, {Actions, Content, Header} from "./components/Modal";
import Dimmer from "./components/Dimmer";
import image from "./assets/girl.jpg";

function App() {
    const [visible1, setVisibility1] = useState(false);
    const [visible2, setVisibility2] = useState(false);

    const handleVisible1Submit = useCallback(() => {
        setVisibility1(false);
        setVisibility2(true);
    }, []);

    return (
        <>
            <div className="ui three column center aligned middle aligned grid" style={{ minHeight: '100vh' }}>
              <div className="row">
                <div className="column">
                  <button onClick={() => setVisibility1(!visible1)} className="ui large primary button" type="button">
                      show #1
                  </button>
                  <button onClick={() => setVisibility2(!visible2)} className="ui large primary button" type="button">
                      show #2
                  </button>
                </div>
              </div>
            </div>
            <Dimmer>
                <Modal visible={visible1}>
                    <Header>
                        Select a Photo
                    </Header>
                    <Content image>
                        <div className="ui medium image" style={{ minHeight: '200px' }}>
                            <img src={image} />
                        </div>
                        <div className="description">
                            <div className="ui header">Default Profile Image</div>
                            <p>Is it okay to use this photo?</p>
                        </div>
                    </Content>
                    <Actions>
                        <button type="button" onClick={() => setVisibility1(false)} className="ui black deny button">
                            Nope
                        </button>
                        <button type="button" onClick={handleVisible1Submit} className="ui positive right labeled icon button">
                            Yep, that's me
                            <i className="checkmark icon" />
                        </button>
                    </Actions>
                </Modal>
                <Modal size="mini" visible={visible2} onClose={() => setVisibility2(false)}>
                    <Header>
                        Submit action
                    </Header>
                    <Content>
                        Are you sure you want to submit an action?
                    </Content>
                    <Actions>
                        <button onClick={() => setVisibility2(false)} type="button" className="ui positive button">Yes</button>
                        <button onClick={() => setVisibility2(false)} type="button" className="ui negative button">NO!</button>
                    </Actions>
                </Modal>
            </Dimmer>
        </>
    );
}

export default App;
