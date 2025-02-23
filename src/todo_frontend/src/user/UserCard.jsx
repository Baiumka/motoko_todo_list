import React, { useState, useEffect, useContext  } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Button, Form } from "react-bootstrap";
import { UserContext } from "../context/UserConstext";

function NicknameModal({ show, handleClose, handleSave }) {
  const [nickname, setNickname] = useState("");

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Введите ваш никнейм</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="nicknameInput">
            <Form.Label>Никнейм</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your nickname"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Отмена
        </Button>
        <Button variant="success" onClick={() => handleSave(nickname)}>
          Сохранить
        </Button>
      </Modal.Footer>
    </Modal>
  );
}


function UserCard() {
    const {myUser, isLogin, isNewUser, login, logout, register } = useContext(UserContext);  
    return (
      <div>
      {
        <div>
        <img src="/guest_avatar.png" alt="User Avatar" class="user-avatar" />
        <div class="user-info">
            { isLogin ? (
              <div>                              
              { isNewUser ? (
                  <div>                    
                    <NicknameModal
                      show={isNewUser}
                      handleClose={() => {}}
                      handleSave={register}
                    />
                  </div>
                ) : (      
                    <div>    
                    { myUser ? (
                    <div>        
                      <p class="user-name">{myUser.principal.toText()}</p>
                      <p class="user-login">{myUser.nickname}</p>
                      <button class="btn btn-danger ms-auto" onClick={logout}>Log Out</button>
                    </div>  
                        ) : (
                            <div>
                            </div>
                        )
                    }
                    </div>
                    
                )
              }        
              </div>
          ) : (            
            <div>        
              <p class="user-name">xxxxx-xxxxx-xxxxx-xxxxx-xxxxx-xxxxx-xxxxx-xxxxx-xxxxx-xxxxx-xxx</p>
              <p class="user-login">Гость</p>
              <button class="btn btn-primary ms-auto" onClick={login}>IC Log In</button>
            </div>  
          )
          }
          </div>
          </div>
      }      
      </div>
    );  
}

export default UserCard;

