#pragma strict

var corridor: float = 5.0;
var acceleration: float = 0.1;
var additiveVelocityValue: float = 0.2;
var trackSections: GameObject[];
var track = new Array();
private var sectionToDelete: GameObject;
private var trackSectionsAccomplished: int = 0;
private var trackSectionLength: int = 50;
private var additiveVelocity: float = 0.0;
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

	//building track
	if (trackSectionsAccomplished * trackSectionLength < transform.position.z + trackSectionLength) {
	//	print (Mathf.Floor (Random.Range (0, trackSections.Length)));
		track[trackSectionsAccomplished] = (Instantiate (trackSections[Mathf.Floor (Random.Range (0, trackSections.Length))],
														Vector3(0, 0, trackSectionsAccomplished * (1 + trackSectionLength) + trackSectionLength),
														Quaternion.Euler(Vector3(270, 0, 0))));
		print(track[trackSectionsAccomplished]);
	//	track.Length++;
		trackSectionsAccomplished++;
	}
	if ((trackSectionsAccomplished - 1) * trackSectionLength < transform.position.z && trackSectionsAccomplished >= 2) {
		GameObject.Destroy (track[trackSectionsAccomplished - 2]);
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