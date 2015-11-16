# drone-time

**Decentralised robot timesharing based on the Ethereum protocol and Robot Operating System**

Robots have dead time (powered but not being used) during which they can be rented out to the neighbourhood.

With ETH users can purchase timeshare in a network of drones and utilise a range of services: Area surveillance, Asset tracking, Environmental monitoring, Loud speaker :)

**rent-a-bot client** ethereum node that shows status of the robot network and availability of resources. allows specification of robot duties and purchasing of drone time (inc. specialised labour).

**snappy-client** snappy ubuntu client to report drone status to the network and recieve And carry out work orders from users/market scouts

**Bonus task**
Revenue pathways in the decentralised drone network create a fund for drone-time response to emergency situations

(taxemes? https://medium.com/@resilience_me/taxemes-in-detail-a-conversation-8fe10f081a52)


**Pleasde read**

This is very much work in progress. I have never put together a software application before and have barely written code so am learning things as I go along. I am very open to useful suggestions, criticisms, alterations and contributions. This is a learning exercise for myself to know more about building new technologies and in particular Ethereum smart-contracts that interact with IoT. As such I would really appreciate the chance to work and learn together. This is intended for people who have similar goals (or of course, those who wish to teach!).

GOAL 1 (80%)
Create a structural framework (currently using Embark) that can accept
-  front-end code to send instructions to to the EVM
-  solidity code to be compiled to the EVM

Goal 2 (60-70%)
Create a structural framework that can manipulate robot functions through smart contracts
-  chosen to build on snappy ubuntu
-  create structure to house code and dependancies for building robot operation client (currently using ROS and Catkin for development)
-  Identify how a smart contract (address?) can pass instructions to a snappy app
-  Identify suitable ethereum client for snappy robot

Goal 3
- Tidy stuff up

Goal 4 (0%)
-  write method for passing ethereum transaction and work details to a robot client

Goal 5 (0%)
-  write method for accepting ethereum contract code and creating robot instruction set

Goal 5 (0%)
-  write report on process, experience, advice feedback etc. and share

ALSO: In the trustless decentralised sharing economy there are opportunities for sharing of resources and spreading of wealth. Theerfore I see there to be an ability for this robot network to appropriate a shared of transactions to defined purposes such as disaster aid. I know little about what these sorts of contracts would look like but I intend to follow the conversations and apply what i can at least in spirit to this project. Goal 6?