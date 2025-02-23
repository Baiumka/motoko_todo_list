import { Card, Button} from 'react-bootstrap';
import { colorDictionary} from "../components/ColorDict";
import { darken } from 'polished';

const TaskCard = ({ task, onEdit, onDelete, onComplete }) => {

  const formatDate = (nanoseconds) => {
    const milliseconds = Number(nanoseconds) / 1_000_000;
    const date = new Date(milliseconds);
    return date.toLocaleString();
  };

    return (
      <Card className="task-card" style={{ backgroundColor: task.state ? darken(0.5, colorDictionary[task.color]) : colorDictionary[task.color] }}>
        <Card.Body>
          <div className="task-card-header">
            {task.state ? (
                  <Card.Title className="task-title"><s>{task.title}</s></Card.Title>
                ) : (
                  <Card.Title className="task-title">{task.title}</Card.Title>
            )}
            {!task.is_example ? (
            <div className="task-header-right">
              <img src="edit.png" variant="link" alt="Crown" className="task-crown-icon" onClick={onEdit}/>
              <Button variant="link" className="task-delete-btn" onClick={onDelete}>×</Button>
            </div>
            ): (
              <div></div>  
            )}
          </div>
          {/*<Card.Subtitle className="mb-2 text-muted task-subtitle">Assigned to: {task.user.nickname}</Card.Subtitle>*/}
          <Card.Text className="task-description">{task.descr}</Card.Text>
          <Card.Text className="task-date"><small>{task.is_edited ? "Edited at:" : "Created at:"} {formatDate(task.created_at)}</small></Card.Text>
          <div className="button-container">
          {!task.is_example ? (
            <div>
            { task.wait ? (
              <Button variant="primary"><img src="loading.gif" className="task-crown-icon"/></Button>
            ) : (
              <div>
              {task.state ? (
                <Button variant="danger" onClick={onComplete}>Uncomplete</Button>
              ) : (
                <Button variant="success" onClick={onComplete}>Complete</Button>
              )}
              </div>
            )}
            </div>
            ) : (
              <div></div>
            )}
          </div>
        </Card.Body>
      </Card>
    );
  };


export default TaskCard;