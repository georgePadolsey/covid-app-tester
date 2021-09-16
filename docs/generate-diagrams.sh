

# Only required when you want to update the diagram

if ! command -v dot &> /dev/null
then
    echo "Command dot not found, it will need to be installed if you wish to update the diagrams in the documentation. This is not needed for the general application to run." >&2;
    exit 1;
fi

dot -Tpng main-state-machine.dot -o main-state-machine.png