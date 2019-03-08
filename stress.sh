artillery run util/bombard.yaml > aftermath.txt;

tail -n+$(grep -n 'All virtual users finished' aftermath.txt | awk -F ":" '{ print $1 }') aftermath.txt;
