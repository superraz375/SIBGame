angular.module('app.controllers', [])
    .controller('controller', ['$scope', 'SweetAlert', function($scope, SweetAlert) {

        $scope.attemptCount = 0;

        $scope.levels = [
            {
                inputs: 3,
                locks: 0,
                keys: 1
            }
        ];

        $scope.settings = {
            currentLevel: 0,
        }

        $scope.level = $scope.levels[$scope.settings.currentLevel];

        $scope.inputs = [];


        $scope.init = function() {
            $scope.changeLevel(1);
        }

        $scope.showInstructions = function() {
            SweetAlert.swal("Instructions",
                "1. Guess the value for each input.\n2. Continue to the next level."
            );
        };

        $scope.changeLevel = function(levelNumber) {

            $scope.attemptCount = 0;
            $scope.settings.currentLevel = levelNumber - 1;
            $scope.level = $scope.levels[$scope.settings.currentLevel];

            for(var i = 0; i < $scope.level.inputs; i++) {
                $scope.inputs.push(
                    {
                        value: null
                    }
                );
            }
        }

        $scope.pressKey = function(event) {
            if(event.charCode == 48) {
                // 0
                $scope.insertNextInputValue(false);
            } else if (event.charCode == 49) {
                // 1
                $scope.insertNextInputValue(true);
            } else if (event.charCode == 13) {
                // Enter
                $scope.submit();
            }
        };

        $scope.clickZero = function() {
            $scope.insertNextInputValue(false);
        };

        $scope.clickOne = function() {
            $scope.insertNextInputValue(true);
        };

        $scope.insertNextInputValue = function(isOne) {
            for(var i = 0; i < $scope.level.inputs; i++) {

                var input = $scope.inputs[i];

                if(input.value == null) {
                    input.value = isOne ? 1 : 0;
                    return;
                }
            }

            // Fill the inputs, submit them.
            $scope.submit();
            $scope.insertNextInputValue(isOne);
        }

        $scope.showError = function(msg) {
            SweetAlert.swal("Error!", msg || "Something went wrong.", "error");
        }

        $scope.submit = function() {

            $scope.attemptCount++;

            SweetAlert.swal("Good job!", "You clicked the button!", "success");

            _.each($scope.inputs, function(input) {
               input.value = null;
            });
        }
    }]);
