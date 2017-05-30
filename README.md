Infoset Based Taxi System

#Do-Road
Introduction

The Calico Challenge infoset project was originally designed to chart data collected by data gathering programs called agents. An agent was responsible for collecting data of a specific type. For example there were agents for gathering network device statistics, other agents gathered Linux system performance data.

Infoset was designed to be flexible enough to accept data from any number and types of agent. We added a web front end to help persons visualize its capabilites at http://infoset.palisadoes.org/. At its heart, Infoset is a data collection / retrieval API.

It’s been realized that an agent could be a phone app posting geo-coordinates to the central infoset server. UWI / Utech students have already created a phone app to track geo data, and that there is interest in a tracking application for the transportation system of Jamaica.

The basic aim is to create an app where:

    Taxi and bus drivers register themselves in the system

    Passengers register themselves in the system too

    Passengers will be able to track the status of their favorite route and the proximity of preferred drivers.

    Operators and passengers will be able to get historical data such as average speeds which could be used to improve the customer experience.

These are long term goals. It is expected that the project will take some time, if not years to become fully operational. This should not limit our expectation to do stealth launches of alpha and beta services.
Desired Features

The system should have the following features:

    Possibility of a loyalty system

    Favorite taxi

    Passenger registration using the app

    Driver registration using the app

    Ability for drivers to state whether they are on or off duty

    Passengers should be able to know whether:

        A taxi on the route is moving towards or away from them

        How far away the taxi is

    Use the existing infoset backend code for data storage

Technical Features of the Apps

The development would be in multiple phases. We describe the alpha and beta features next:
Features for the Alpha

The taxi app should have the following features for the alpha.
Taxi Driver

The taxi version of the app should be able to do the following:

    Data to be sent to the central infoset server via data plan / WiFi to prove the concept. Text messaging communication features can come later.

    Data to be formatted according to the Infoset’s JSON structure

    Data need only be sent every 5 minutes. A maximum of 500 bytes per communication.
        This would mean a maximum of 12 x 8 x 500 = 250K per day.

    Data must be stored on the local device in the event of a network failure and sent to the central server when connectivity returns.

Passenger

The passenger version of the app should be able to do the following:

    Provide the distance from the selected taxi driver phone, its estimated speed and direction.

    Should filter results to show only the closest taxi phones

    Should provide this data only on demand, not in real time to reduce data plan usage and server load.

Features for the Beta

The beta would have the following features

    A web based server front end API to infoset would have to be developed to do the following:

        Driver / Passenger registration using the app

        Ability for drivers to state whether they are on or off duty

        Username / password login

        Accept data requests from registered users.

    Ability to have short unintrusive messages included in updates. This could be useful for national disasters, and advertising.

We should expect to handle 10,000 taxis (Need confirmation of a realistic number). This would mean 120,000 queries every hour, or 33 transactions per second.
Why Infoset

Infoset was designed to be an all purpose data gathering application. The web front end was created to help people visualize what could be possible.

JSON data is HTTP posted to the infoset API which then placed in a MySQL based backend. Infoset has the following features:

    Database connection pooling to reduce the load on the database server when there are high transaction volumes.

    Multiprocess updates that take advantage of all the CPU cores of a server.

    Data validation to ensure the JSON meets the specification

Agents Posting JSON to Infoset

Data from phone agents should post data to the infoset server using json formatted in this way:

{  
   "agent":"taxi",
   "timeseries":{  
      "latitude":{  
         "base_type":1,
         "data":[  
            [  
               1,
               138315134224.0,
               "None"
            ]
         ],
         "description":"Latitude"
      },
      "longitude":{  
         "base_type":1,
         "data":[  
            [  
               1,
               138315134224.0,
               "None"
            ]
         ],
         "description":"Longitude"
      }
   },
   "hostname":"192.168.3.100",
   "timestamp":1474823400,
   "uid":"8a6887228e33e3b433bd0da985c203904a48e2e90804ae217334dde2b905c57e"
}

Agent JSON Structure Explained
Field 	Description
agent 	Agent name
timeseries 	Time series data follows
latitude 	Latitude Label. Latitude data follows
longitude 	Longitude Label. Longitude data follows
base_type 	Defaults to 1. Means a non-incremental number.
description 	Description of the data
data 	Data related to labels. A list of lists. In the case of the app, this would be a single list of. 1 = Unique number or string of the data. Ie. In this case we use the number 1 for the first entry. Value = Value of the data related to the data Description = Description of the data. This isn’t necessary and is set to None
hostname 	Hostname of the device sending the data. In the case of a phone, this could be set to None.
timestamp 	Time when data was generated
UID 	A unique identifier for the device sending the data. Could be a SIM ID or phone number.
Central Database Structure

The central database will need to have the following structure
Taxi Tables
Data Table
Field 	Description
phone 	Phone number of driver
type 	Transport Type (Taxi/Coaster/JUTC)￼
Latitude 	Latitude of phone when data was posted
Longitude 	Longitude of phone when data was posted
timestamp 	UTC timestamp of when data was posted
Infoset Backend Tables

The following describes how the infoset backend works. You can refer to details of each table in infoset’s infoset/db/db_orm.py file.
Agent Table
Field 	Description
idx 	Index value for the agent
uid 	Unique identifier for the agent
name 	Agent name
Data Table
Field 	Description
idx_datapoint 	Index value for the datapoint
value 	Value of the datapoint
timestamp 	UTC timestamp of when data was posted
Datapoint Table
Field 	Description
idx 	The datapoint’s index value
idx_agent 	Idx value of the agent that created the data
