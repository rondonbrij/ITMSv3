am trying to think of a way how to assign price in van booking website we're making and for filtering the destination. image this as an example, palawan has north and south routes, in south palawan starting from the main IRawan terminal there are are these municipalities destinations: Aborlan, Narra, Abo-abo, Sofronio Espanola, Brooke's Point, RioTuba, Bataraza, quezon, berong rizal

the dead ends are berong, rizal, riotuba, bataraza (riotuba is in bataraza)

to get to rizal there are you must take the route aborlan. narra, abo-abo, quezon, then rizal
to get to berong, the route is aborlan, narra, abo-abo, quezon, berong
to get to riotuba or bataraza, you must take the aborlan, narra, abo-abo, sofronio espanola, then riotuba or bataraza

situations:
ron want to go to Rituba so he must take the van that has riotuba or bataraza as endpoint
Don want to go to Bataraza so he must take the van that has riotuba or bataraza as endpoint
carl want to go to berong so he needs a van that has berong as the endoint
Jason want to go to rizal so he needs a van that has rizal as the endoint
lou wants to go to quezon so therefore the van he must take is the van that has quezon as as the endpoint or as the checkpoint, so here he can take any van that has the endpoint berong or rizal as both has the quezon as checkpoint
for those who want to got to aborlan, narra, abo-abo, they can take any van that has the endpoint or checkpoints of Soforno espanola, brokes point, riotuba, bataraza, quezon, berong, rizal

story:
Sam wants to go to riotuba he opens the website the front page asks him where do you want to go? North South buttons shown to him. Sam chose South, he is redirected to trip-selection. in trip selection, all the trips must be shown that belongs to the south or that has the south attribute. trip-selection has filtering destination, date, vehicle type (bus or van). Sam selects the ritotuba in filter. all the trips must be shown that leads to riotuba/Batarza.

mimi wants to go to quezon he opens the website the front page asks him where do you want to go? North South buttons shown to him. mimi chose South, he is redirected to trip-selection. in trip selection, all the trips must be shown that belongs to the south or that has the south attribute. trip-selection has filtering destination, date, vehicle type (bus or van). mimi selects the quezon in filter. all the trips must be shown that has endpoint or checkpoint quezon, this includes trips that leads to quezon adn trips to berong or rizal as both berong and rizal passes quezon

the checkpoints are the municipalities that they will pass

for example if the destination the passenger choose is aborlan then the trips shown are those that has aborlan as their checkpoint or endpoint

in the transport-companies interface, to create a trip they will select an endpoint, for example the endpoint is rizal, automatically the checkpoints are aborlan, narra, abo-abo, quezon and the endpoint is rizal

this trip will be shown to users that selects any of those that belong to its checkpoints including its endpoint

anothe is an example user seelcts as abo-abo as destination, then all trips will be shown that has abo-abo as endpoint or destination example are trips that the endpoint of bataraza, riotuba, beronng or rizal or any of those that has abo-abo as checkpoint or its endpoint

based on those files, modify them according to this:
