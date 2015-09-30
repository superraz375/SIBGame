angular.module('app.controllers', [])
    .controller('controller', ['$scope', 'SweetAlert', function($scope, SweetAlert) {

        $scope.attemptCount = 0;

        $scope.levels = [
            {
                inputs: 3,
                locks: 0,
                keys: 1
            },
            {
                inputs: 4,
                locks: 0,
                keys: 1
            },
            {
                inputs: 5,
                locks: 0,
                keys: 1
            },
            {
                inputs: 6,
                locks: 0,
                keys: 1
            }
        ];

        $scope.settings = {
            currentLevel: 0,
        }

        $scope.level = $scope.levels[$scope.settings.currentLevel];

        $scope.inputs = [];
        $scope.correctInputs = [];


        $scope.init = function() {

            $scope.changeLevel(0);
        }

        $scope.showInstructions = function() {
            SweetAlert.swal("Instructions",
                "1. Guess the value for each input.\n2. Continue to the next level."
            );
        };

        $scope.changeLevel = function(levelNumber) {

            if (!$scope.levels[levelNumber]) {
                $scope.showError('Specified level does not exist');
                return;
            }


            $scope.attemptCount = 0;
            $scope.settings.currentLevel = levelNumber;
            $scope.level = $scope.levels[$scope.settings.currentLevel];
            $scope.inputs = [];
            $scope.correctInputs = [];

            for (var i = 0; i < $scope.level.inputs; i++) {
                $scope.inputs.push(
                    {
                        value: null
                    }
                );
                $scope.correctInputs.push(
                    {
                        value: Math.random() > 0.5 ? 1 : 0
                    }
                );
            }
        };

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

        $scope.ignoreKeyPress = function(event) {
            // Ignore key presses when focused on an input
            event.stopPropagation();
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

        $scope.areInputsFilled = function() {

            var isFilled = true;

            _.each($scope.inputs, function(input) {
                if(input.value == null) {
                    isFilled = false;
                    return;
                }
            });

            return isFilled;
        }

        $scope.clearInputs = function() {
            _.each($scope.inputs, function(input) {
                input.value = null;
            });
        };

        $scope.checkInputs = function() {

            for(var i = 0; i < $scope.inputs.length; i++) {
                if($scope.inputs[i].value == null
                    || $scope.inputs[i].value != $scope.correctInputs[i].value)
                {
                    return false
                }
            }
            return true;
        };

        $scope.submit = function() {

            if(!$scope.areInputsFilled()) {
                // Inputs are not filled
                return;
            }

            $scope.attemptCount++;

            var isCorrect = $scope.checkInputs();

            if(isCorrect) {
                if($scope.settings.currentLevel + 1 < $scope.levels.length) {
                    SweetAlert.swal("Congratulations", "You are now on Level " + ($scope.settings.currentLevel + 2), "success");
                    $scope.settings.currentLevel + 1
                    $scope.changeLevel($scope.settings.currentLevel + 1);
                } else {
                    SweetAlert.swal("Good job!", "You finished all the levels!", "success");
                }
            } else {
                $scope.showError('Incorrect input sequence');
            }

            $scope.clearInputs();
        }
    }]);
