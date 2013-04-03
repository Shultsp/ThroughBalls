#pragma strict

var corridor: float = 5.0; //width of the corridor
var acceleration: float = 0.1;
var additiveVelocityValue: float = 0.2; //percent of current speed to throttle or brake
var trackSections: GameObject[]; //array from what to build track
var multiplayerGame: boolean = false; //single- or multiplayer game
private var track = new Array(); //arrey of builded track
private var trackSectionsAccomplished: int = 0; //sections of track behind
private var trackSectionLength: int = 50; //length of one section
private var additiveVelocity: float = 1.0; //speed to throttle or brake
private var velocity: float;
private var score: float = 0;

function Start () {
	score = 0;
//	track.Length = 1;
}

function Update () {
	// mouse controls
	transform.position.x = Input.mousePosition.x / Screen.width * corridor - corridor / 2;
	transform.position.y = Input.mousePosition.y / Screen.height * corridor - corridor / 2;
//	print (Input.mousePosition.x + "; " + transform.position.x);

	// speed controls
	if (Input.GetMouseButton (0)) { // left mouse button, speed up
		additiveVelocity = 1.0 + additiveVelocityValue;
	} else if (Input.GetMouseButton (1)) { // right mouse button, speed down
		additiveVelocity = 1.0 - additiveVelocityValue;
	} else additiveVelocity = 1.0;
	
	// incrementing speed
	velocity += acceleration * Time.deltaTime;
	transform.position.z += velocity * additiveVelocity;
//	print (velocity + "; " + acceleration + "; " + additiveVelocity);

	// score
	score += Mathf.Round (5 * velocity);
//	print ('Score: ' + score);

	//building track in front
	if (trackSectionsAccomplished * trackSectionLength < transform.position.z + trackSectionLength) {
	//	print (Mathf.Floor (Random.Range (0, trackSections.Length)));
		track[trackSectionsAccomplished] = (Instantiate (trackSections[Mathf.Floor (Random.Range (0, trackSections.Length))],
														Vector3(0, 0, trackSectionsAccomplished * (1 + trackSectionLength) + trackSectionLength),
														Quaternion.Euler(Vector3(270, 0, 0))));
		trackSectionsAccomplished++;
	}
	//destroy track behind
	if ((trackSectionsAccomplished - 2) * 1.1 * trackSectionLength < transform.position.z && trackSectionsAccomplished >= 3) {
		GameObject.Destroy (track[trackSectionsAccomplished - 3]);
	}
}

function OnCollisionEnter () {
	velocity = -acceleration;
	score -= 250;
}

function OnGUI () {
	GUI.Box (Rect (3, 3, 250, 80), 	"Score: " + score + 
								//	"\nVelocity: " + Mathf.Round (100*velocity)/100 + "; Acceleration: " + acceleration + 
								//	"\nadditiveVelocity:" + additiveVelocity +
								//	"\nposition x=" + transform.position.x + "; y=" + transform.position.y +
									"\nTrack Sections Accomplished: " + trackSectionsAccomplished);
}