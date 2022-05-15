<!DOCTYPE html>
<html>
    <head>
      <title>IoT Phone</title>
      <link rel='stylesheet' href='stylesheets/device.css'/>
      <meta name="viewport" content="width=device-width, initial-scale=2" />
    </head>
    
    <body>
        <div class="outer-main">
            <table id="score_table">
                <tr>
                    <th>ID</th>
                    <th>points</th>
                </tr>
                
                <?php
                    $conn = mysqli_connect("eu-cdbr-west-02.cleardb.net", "b0410c0e5044f9", "1b7079f4", "heroku_6ae6c626c9a22c7");
                    if($conn-> connect_error) {
                        die("Connection failed:". $conn-> connect_error);
                    }

//                    $sql = "SELECT client_id, client_points from clients";
                    $sql = "SELECT client_id, MAX(client_points) AS result FROM heroku_6ae6c626c9a22c7.clients GROUP BY client_id ORDER BY result DESC";
                    $result = $conn-> query($sql);

                    if($result-> num_rows > 0) {
                        while($row = $result-> fetch_assoc()) {
                            echo "<tr><td>". $row["client_id"] . "</td><td>" . $row["result"] . "</td></tr>";
                        }

                        echo "</table>";
                        
                    }

                    else {
                        echo "0 result";
                    }

                    $conn-> close();
                ?>
            </table>
        </div>
    </body>
    
</html>