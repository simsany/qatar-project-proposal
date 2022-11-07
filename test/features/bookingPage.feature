Feature: Passenger number selection

    Scenario: The child passenger age selection is available

        Given the booking page is open 
        And   the number of child passengers is set.
        Then  the child passenger age selection should be available in the set number
        And   the child passenger age selector value should be 2 by default


    
    Scenario Outline: The child passenger age selection should work correctly
        Given the booking page is open 
        And   the number of child passengers is set.
        When  the user set the child pasenger age to <age>.
        Then  the counter should display <age>
        And   the increase child passenger age button's availablilty should be "<increase>"
        And   the decrease child passenger age button's availablilty should be "<decrease>"

    Examples:
    |  age  | increase | decrease |
    |   2   | true     | false    |
    |   5   | true     | true     |
    |   11  | false    | true     |