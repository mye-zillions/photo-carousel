if [ -z $@ ]
then
	echo "AVAILABLE COMMANDS: db | server | node"
elif [ $1 = "db" ]
then
	echo "ENTERING EC2 DATABASE"
	psql \
		-h "ec2-13-57-228-85.us-west-1.compute.amazonaws.com" \
		-p 5432 \
		-U power_user \
		-d xillow
elif [ $1 = "server" ]
then
	echo "ENTERING EC2 SERVER INSTANCE"
	sudo ssh -i "keys/postgres.pem" ec2-user@ec2-13-57-228-85.us-west-1.compute.amazonaws.com
elif [ $1 = "node" ]
then
	echo "ENTERING EC2 NODE INSTANCE"
	sudo ssh -i "keys/photo-carousel.pem" ec2-user@ec2-54-215-238-60.us-west-1.compute.amazonaws.com
else 
	echo "AVAILABLE COMMANDS: db | ec2"
fi


