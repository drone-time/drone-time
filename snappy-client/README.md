# drone-client

Snappy Ubuntu client for easy drone installation

https://erlerobotics.com/blog/product/erle-brain-v2/
https://erlerobotics.com/blog/product/erle-hexacopter/

Process

___Building in catkin workspace with Robot Operating System + packages

___robo-worker.cpp - does paid work. see deps for details.
	catkin_ws/src/robo-worker/src/worker.cpp

___robo-scheduler.cpp - monitors resources and decides duty rota

___robo-status.cpp - anounces status to the network

   ....

___https://github.com/erlerobot/ros2snap

//TODO
//snappy app for eth client? thin client? full client?

//TODO
Link template drone worker routine to solidity contract vars
https://github.com/erlerobot/ros_erle_takeoff_land
