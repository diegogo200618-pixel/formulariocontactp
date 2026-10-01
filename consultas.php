<?php
include 'conexion.php';

$id_usuario = isset($_GET['id']) ? $_GET['id'] : null;
$usuario_info = null;
$ventas = [];

if ($id_usuario) {
    $sql_usuario = "SELECT id_usuario, nombre_completo, usuario, rol FROM login WHERE id_usuario = ? LIMIT 1";
    $stmt_u = $conexion->prepare($sql_usuario);
    $stmt_u->bind_param("i", $id_usuario);
    $stmt_u->execute();
    $res_u = $stmt_u->get_result();
    
    if ($res_u->num_rows > 0) {
        $usuario_info = $res_u->fetch_assoc();
        
        $sql_ventas = "SELECT id_venta, fecha_venta, total_venta FROM venta WHERE id_usuario = ?";
        $stmt_v = $conexion->prepare($sql_ventas);
        $stmt_v->bind_param("i", $id_usuario);
        $stmt_v->execute();
        $res_v = $stmt_v->get_result();
        
        while ($row = $res_v->fetch_assoc()) {
            $ventas[] = $row;
        }
    }
}
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ventas por Usuario</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 40px; background-color: #f4f7f6; }
        .contenedor { max-width: 800px; margin: 0 auto; background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
        .perfil { margin-bottom: 20px; padding: 15px; background: #eef2f3; border-left: 5px solid #2c3e50; border-radius: 4px; }
        table { width: 100%; border-collapse: collapse; margin-top: 20px; }
        th, td { text-align: left; padding: 12px; border-bottom: 1px solid #ddd; }
        th { background-color: #2c3e50; color: white; }
        tr:hover { background-color: #f5f5f5; }
        .error { color: #e74c3c; font-weight: bold; }
    </style>
</head>
<body>

<div class="contenedor">
    <?php if ($usuario_info): ?>
        <div class="perfil">
            <h2>Vendedor: <?php echo htmlspecialchars($usuario_info['nombre_completo']); ?></h2>
            <p><strong>Usuario:</strong> <?php echo htmlspecialchars($usuario_info['usuario']); ?> | <strong>Rol:</strong> <?php echo htmlspecialchars($usuario_info['rol']); ?></p>
        </div>

        <h3>Historial de Ventas Realizadas</h3>
        <?php if (count($ventas) > 0): ?>
            <table>
                <thead>
                    <tr>
                        <th>ID Venta</th>
                        <th>Fecha de Venta</th>
                        <th>Total Venta</th>
                    </tr>
                </thead>
                <tbody>
                    <?php foreach ($ventas as $venta): ?>
                        <tr>
                            <td><?php echo $venta['id_venta']; ?></td>
                            <td><?php echo $venta['fecha_venta']; ?></td>
                            <td>$<?php echo number_format($venta['total_venta'], 2); ?></td>
                        </tr>
                    <?php endforeach; ?>
                </tbody>
            </table>
        <?php else: ?>
            <p>Este usuario aún no tiene ventas registradas.</p>
        <?php endif; ?>

    <?php else: ?>
        <p class="error">
            <?php 
            if (!$id_usuario) {
                echo "Por favor, especifica un ID en la URL. Ejemplo: http://localhost/consulta.php?id=2";
            } else {
                echo "No se encontró ningún usuario con el ID: " . htmlspecialchars($id_usuario);
            }
            ?>
        </p>
    <?php endif; ?>
</div>

</body>
</html>
